const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { URL } = require('url');

// File paths
const htmlPath = path.join(__dirname, 'all_cases.html');
const responsePath = path.join(__dirname, 'reposen.json');
const outputHtmlPath = path.join(__dirname, 'all_cases_highlighted.html');
const notFoundJsonPath = path.join(__dirname, 'not_found_links.json');

// Read files
const html = fs.readFileSync(htmlPath, 'utf-8');
const response = JSON.parse(fs.readFileSync(responsePath, 'utf-8'));

// Helper: get all possible forms of a link (absolute, relative, no trailing slash, etc)
function getPossibleUrls(link) {
  const urls = new Set();
  urls.add(link);

  try {
    const u = new URL(link);
    // Add without trailing slash
    if (u.pathname.endsWith('/')) {
      urls.add(link.replace(/\/$/, ''));
    }
    // Add with trailing slash
    if (!u.pathname.endsWith('/')) {
      urls.add(link.replace(/([^\/])$/, '$1/'));
    }
    // Add just the path (relative)
    urls.add(u.pathname + u.search + u.hash);
  } catch (e) {
    // Not a valid absolute URL, maybe already relative
    if (link.startsWith('/')) {
      urls.add(link.replace(/\/$/, ''));
      urls.add(link + '/');
    }
  }
  return Array.from(urls);
}

// Get all broken links from the JSON
const brokenLinks = (response.brokenResourceLinks || []).map(obj => obj.link);
const notFoundLinks = [];

// Load HTML
const $ = cheerio.load(html);

// For each broken link, try to highlight all matching elements
brokenLinks.forEach(link => {
  let found = false;
  const possibleUrls = getPossibleUrls(link);

  // Check <a href="">
  possibleUrls.forEach(url => {
    $(`a[href="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Link');
      found = true;
    });
    // <area href="">
    $(`area[href="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Map Area');
      found = true;
    });
    // <img src="">
    $(`img[src="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Image');
      found = true;
    });
    // <link href="">
    $(`link[href="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Resource');
      found = true;
    });
    // <script src="">
    $(`script[src="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Script');
      found = true;
    });
    // <video src="">
    $(`video[src="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Video');
      found = true;
    });
    // <audio src="">
    $(`audio[src="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Audio');
      found = true;
    });
    // <source src="">
    $(`source[src="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Source');
      found = true;
    });
    // <object data="">
    $(`object[data="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Object');
      found = true;
    });
    // <iframe src="">
    $(`iframe[src="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Iframe');
      found = true;
    });
    // <form action="">
    $(`form[action="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Form Action');
      found = true;
    });
    // Inline style background-image
    $(`[style*="${url}"]`).each(function () {
      $(this).css('background-color', 'rgba(255,0,0,0.3)');
      $(this).css('border', '2px solid red');
      $(this).attr('title', 'Broken Background Image');
      found = true;
    });
  });

  // If not found in any element, add to notFoundLinks
  if (!found) {
    notFoundLinks.push(link);
  }
});

// Write the new HTML file
fs.writeFileSync(outputHtmlPath, $.html(), 'utf-8');

// Write the not found links JSON
fs.writeFileSync(notFoundJsonPath, JSON.stringify(notFoundLinks, null, 2), 'utf-8');

console.log('Highlighting complete. Check all_cases_highlighted.html and not_found_links.json.');