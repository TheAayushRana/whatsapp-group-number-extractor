document.addEventListener('DOMContentLoaded', () => {
  const { extractButton, result } = {
    extractButton: document.getElementById('extractButton'),
    result: document.getElementById('result'),
  };

  extractButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: 'extractNumbers',
      });

      if (response.numbers.length > 1) { // Check for length > 1 because of the header row
        const csvContent =
          'data:text/csv;charset=utf-8,' + response.numbers.join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${response.groupName}_phone_numbers.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        result.textContent = `${response.numbers.length - 1} numbers extracted from "${response.groupName}" and downloaded.`;
      } else {
        result.textContent = 'No phone numbers found.';
      }
    } catch (error) {
      result.textContent = 'Error: Make sure you are on web.whatsapp.com and have a group chat open';
    }
  });
});
