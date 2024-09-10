const apiKey = 'AIzaSyD6eZyCuemhSnLp1V0gjggdUfIcHUGfPaI'; // Your API key
const sheetId = '1v1Ax6x3XeLC-cMoEE3qEcWO9D-HCEISuLLWbmyiI2Po'; // Your Google Sheet ID
let allItems = [];
let videoStyles = new Set();
let designTypes = new Set();
let videoTypes = new Set();

async function fetchSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A2:I?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
}

function createGalleryItem(item) {
    const [videoDesign, clientName, videoDesignName, assetType, style, assetImgLink, format, , fileLink] = item;

    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    galleryItem.dataset.format = format.toLowerCase();
    galleryItem.dataset.type = assetType.toLowerCase();

    // Check if the format is a Vimeo link
    if (format === 'Video' && assetImgLink.includes('player.vimeo.com')) {
        const iframe = document.createElement('iframe');
        iframe.src = assetImgLink;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; fullscreen';
        iframe.width = '100%';
        iframe.height = '150px';
        galleryItem.appendChild(iframe);
    } else if (format === 'Image') {
        const img = document.createElement('img');
        img.src = assetImgLink;
        galleryItem.appendChild(img);
    } else if (format === 'Video') {
        const video = document.createElement('video');
        video.src = assetImgLink;
        video.controls = true;
        galleryItem.appendChild(video);
    } else if (['PDF', 'Figma', 'PPT'].includes(format)) {
        const link = document.createElement('a');
        link.href = assetImgLink;
        link.textContent = `View ${format}`;
        link.target = '_blank';
        galleryItem.appendChild(link);
    }

    const details = document.createElement('div');
    details.classList.add('details');
    details.innerHTML = `
        <div><strong>Client:</strong> ${clientName}</div>
        <div><strong>Design:</strong> ${videoDesignName}</div>
        <div><strong>Type:</strong> ${assetType}</div>
        <div><strong>Style:</strong> ${style}</div>
        <div><strong>Format:</strong> ${format}</div>
    `;
    galleryItem.appendChild(details);

    return galleryItem;
}

function renderGallery(items) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear gallery
    items.forEach(item => {
        gallery.appendChild(item);
    });
}

function renderStyleFilters(styles) {
    const styleDropdown = document.getElementById('style-dropdown');
    styleDropdown.innerHTML = '<option value="">Select Style</option>'; // Reset options
    styles.forEach(style => {
        const option = document.createElement('option');
        option.value = style.toLowerCase();
        option.textContent = style;
        styleDropdown.appendChild(option);
    });
}

function renderTypeFilters(types) {
    const typeDropdown = document.getElementById('type-dropdown');
    typeDropdown.innerHTML = '<option value="">Select Type</option>'; // Reset options
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        typeDropdown.appendChild(option);
    });
}

function renderVideoTypeFilters(types) {
    const videoTypeDropdown = document.getElementById('type-dropdown');
    videoTypeDropdown.innerHTML = '<option value="">Select Type</option>'; // Reset options
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.toLowerCase();
        option.textContent = type;
        videoTypeDropdown.appendChild(option);
    });
}

function filterGallery(filter, style = null, type = null) {
    let filteredItems;
    if (filter === 'all') {
        filteredItems = allItems;
    } else if (filter === 'video') {
        filteredItems = allItems.filter(item => item.dataset.format === 'video');
        if (style) {
            filteredItems = filteredItems.filter(item => item.querySelector('.details div:nth-child(4)').textContent.includes(style));
        }
        if (type) {
            filteredItems = filteredItems.filter(item => item.dataset.type === type);
        }
    } else if (filter === 'design') {
        filteredItems = allItems.filter(item => ['image', 'pdf', 'figma', 'ppt'].includes(item.dataset.format));
        if (type) {
            filteredItems = filteredItems.filter(item => item.dataset.type === type);
        }
    }
    renderGallery(filteredItems);
}

// Fetch and render data
fetchSheetData().then(data => {
    allItems = data.map(item => createGalleryItem(item));
    renderGallery(allItems);

    // Collect unique video styles, design types, and video types
    data.forEach(item => {
        const [, , , assetType, style, , format, , ,] = item;
        if (format === 'Video' && style) {
            videoStyles.add(style);
        }
        if (['Image', 'PDF', 'Figma', 'PPT'].includes(format) && assetType) {
            designTypes.add(assetType);
        }
        if (format === 'Video' && assetType) {
            videoTypes.add(assetType);
        }
    });

    // Render filters for videos and design types
    renderStyleFilters(Array.from(videoStyles));
    renderTypeFilters(Array.from(designTypes));
    renderVideoTypeFilters(Array.from(videoTypes));
});

// Add event listeners to filter links
document.querySelectorAll('.filter-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelectorAll('.filter-link').forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        const filter = link.dataset.filter;
        if (filter === 'video') {
            // Show style and type dropdowns when video filter is selected
            document.getElementById('style-filters').style.display = 'block';
            document.getElementById('type-filters').style.display = 'none';
        } else if (filter === 'design') {
            // Show type dropdown when design filter is selected
            document.getElementById('style-filters').style.display = 'none';
            document.getElementById('type-filters').style.display = 'block';
        } else {
            // Hide both dropdowns for other filters
            document.getElementById('style-filters').style.display = 'none';
            document.getElementById('type-filters').style.display = 'none';
        }
        filterGallery(filter);
    });
});

// Add event listeners to dropdowns
document.getElementById('style-dropdown').addEventListener('change', (event) => {
    const style = event.target.value;
    const type = document.getElementById('type-dropdown').value;
    filterGallery('video', style, type);
});

document.getElementById('type-dropdown').addEventListener('change', (event) => {
    const style = document.getElementById('style-dropdown').value;
    const type = event.target.value;
    filterGallery('video', style, type);
});

document.getElementById('type-dropdown-design').addEventListener('change', (event) => {
    const type = event.target.value;
    filterGallery('design', null, type);
});
