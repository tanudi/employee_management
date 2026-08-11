export async function fetchDepartments() {
    try {
        const response = await fetch('/api/departments');
        if(!response.ok) {
            throw new Error('fetch departments failed')
        }
        return await response.json();
    } catch(err) {
        console.error(err);
    }
}