document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('updateForm');
    const fields = ['npm', 'nama', 'angkatan', 'ipk'];
    const payload = new Proxy({}, {
        get(target, prop) {
            return target[prop];
        },
        set(target, prop, value) {
            if (
                value === null ||
                value === undefined ||
                (typeof value === 'string' && value.trim() === '')
            ) {
                delete target[prop]
                return true
            };
            target[prop] = value;
            return true;
        }
    });

    fields.forEach(field => {
        const input = form.elements[field];
        const checkbox = form.elements['c' + field];

        checkbox.addEventListener('change', () => {
            input.disabled = !checkbox.checked;
            if (input.disabled) {
                delete payload[field]
            } else {
                payload[field] = input.value
            }
        });

        input.addEventListener('input', () => {
            payload[field] = input.value
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://restful-api-mahasiswa-production.up.railway.app/mahasiswa/${payload.npm}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            if (response.ok) {
                alert(`Data mahasiswa berhasil diupdate`)
            } else {
                // console.log(result)
                alert(`Data mahasiswa gagal diupdate\nPesan system : ${result.message}`)
            }
        } catch (error) {
            // console.error(error)
            alert("Data mahasiswa gagal diupdate")
        }
    });
});
