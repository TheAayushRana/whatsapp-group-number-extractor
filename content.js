chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractNumbers') {
    const { numbers, groupName } = extractPhoneNumbers();
    sendResponse({ numbers, groupName });
  }
  return true;
});

const extractPhoneNumbers = () => {
  const { targetDiv } = {
    targetDiv: document.querySelector('div.x78zum5.x1cy8zhl.xisnujt.x1nxh6w3.xcgms0a.x16cd2qt')
  };

  if (!targetDiv) {
    return { numbers: [], groupName: '' };
  }

  const { spanElement } = {
    spanElement: targetDiv.querySelector('span')
  };

  if (!spanElement) {
    return { numbers: [], groupName: '' };
  }

  const { content } = {
    content: spanElement.textContent
  };

  // Extract group name from the correct location
  const { groupNameElement } = {
    groupNameElement: document.querySelector('header._amid span.x1iyjqo2.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft.x1rg5ohu._ao3e')
  };

  const groupName = groupNameElement ? groupNameElement.textContent.trim() : 'Unknown Group';

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

  // Add group name to each number
  const numbersWithGroupName = sortedNumbers.map(number => `${groupName},${number}`);

  // Add header row
  numbersWithGroupName.unshift('Group Name,Phone Number');

  return { numbers: numbersWithGroupName, groupName };
};