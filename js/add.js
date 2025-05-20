document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target);

    const payload = {
        npm: formData.get('npm'),
        nama: formData.get('nama'),
        angkatan: String(formData.get('angkatan')), 
        ipk: parseFloat(formData.get('ipk')),      
    }

    try {
        const response = await fetch('https://restful-api-mahasiswa-production.up.railway.app/mahasiswa', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (response.ok) {
            alert(`Data mahasiswa berhasil ditambahkan`)
        } else {
            // console.log(result)
            alert(`Data mahasiswa gagal ditambahkan\nPesan system : ${result.message}`)
        }
    } catch (error) {
        // console.error(error)
        alert("Data mahasiswa gagal ditambahkan")
    }
})