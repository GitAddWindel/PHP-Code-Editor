 // Function to update line numbers
  function updateLineNumbers() {
    var textarea = document.getElementById('editor');
    var lines = textarea.value.split('\n');
    textarea.setAttribute('data-line-number', lines.length); // Update line number attribute
  }

  // Call updateLineNumbers function initially and whenever textarea content changes
  updateLineNumbers();
  document.getElementById('editor').addEventListener('input', updateLineNumbers);

  function executePHP() {
    var code = document.getElementById('editor').value;

    // Send the PHP code to the server for execution
    fetch('execute.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'code=' + encodeURIComponent(code)
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById('output').innerHTML = data;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('output').innerHTML = '<div style="color: red;">Error executing PHP code. Please check your code and try again.</div>';
    });
  }

  function saveAs() {
    var filename = prompt('Enter filename:');
    if (filename) {
      var content = document.getElementById('editor').value;
      var blob = new Blob([content], { type: 'text/plain' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename.endsWith('.php') ? filename : filename + '.php';
      a.click();
    }
  }
