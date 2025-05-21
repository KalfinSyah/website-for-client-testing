document.addEventListener('DOMContentLoaded', () => {
  const contentSection = document.getElementById('content');

  fetch('https://restful-api-mahasiswa-production.up.railway.app/mahasiswa')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(result => {
      const mahasiswaList = result.data;

      if (mahasiswaList.length === 0) {
        contentSection.innerHTML += '<p>No mahasiswa found.</p>';
        return;
      }

      const table = document.createElement('table')
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';

      mahasiswaList.forEach(m => {
        table.innerHTML += `
          <tr>
            <td>${m.nama}</td>
            <td>${m.npm}</td>
            <td>${m.angkatan}</td>
            <td>${m.ipk}</td>
            <td>
              <a href="${window.location.pathname.split('/').slice(0, -1).join('/')}/update/?npm=${m.npm}">Edit</a>
            </td>
          </tr>
        `
      });
      contentSection.appendChild(table);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//   const contentSection = document.getElementById('content');

//   fetch('https://project-php-lumen-api-production.up.railway.app/product')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(result => {
//       console.log(result)
//     })
//     .catch(error => {
//       console.error(error);
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const contentSection = document.getElementById('content');

//   fetch('https://restful-api-mahasiswa-production.up.railway.app/mahasiswa')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(result => {
//       const mahasiswaList = result.data;

//       if (mahasiswaList.length === 0) {
//         contentSection.innerHTML += '<p>No mahasiswa found.</p>';
//         return;
//       }

//       const ul = document.createElement('ul');
//       mahasiswaList.forEach(m => {
//         const li = document.createElement('li');
//         li.textContent = `Nama: ${m.nama}, NPM: ${m.npm}, Angkatan: ${m.angkatan}, IPK: ${m.ipk}`;
//         ul.appendChild(li);
//       });
//       contentSection.appendChild(ul);
//     })
//     .catch(error => {
//       console.error('Fetch error:', error);
//     });
// });

