chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractNumbers') {
    const { numbers } = extractPhoneNumbers();
    sendResponse({ numbers });
  }
  return true;
});

const extractPhoneNumbers = () => {
  const { targetDiv } = {
    targetDiv: document.querySelector('div.x78zum5.x1cy8zhl.xisnujt.x1nxh6w3.xcgms0a.x16cd2qt')
  };

  if (!targetDiv) {
    return { numbers: [] };
  }

  const { spanElement } = {
    spanElement: targetDiv.querySelector('span')
  };

  if (!spanElement) {
    return { numbers: [] };
  }

  const { content } = {
    content: spanElement.textContent
  };

  // Updated regex to match various phone number formats
  const phoneRegex = /\+\d{1,4}\s?(\(\d{1,4}\))?\s?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,9}/g;
  const { numbers } = {
    numbers: content.match(phoneRegex) || []
  };

  // Clean up the extracted numbers
  const cleanedNumbers = numbers.map(number => number.replace(/\s+/g, ' ').trim());

  // Sort numbers by country code
  const sortedNumbers = cleanedNumbers.sort((a, b) => {
    const countryCodeA = a.match(/^\+\d+/)[0];
    const countryCodeB = b.match(/^\+\d+/)[0];
    return countryCodeA.localeCompare(countryCodeB);
  });

  return { numbers: sortedNumbers };
};