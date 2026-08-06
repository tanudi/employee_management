export async function fetchEmployees() {
    try {
        const response = await fetch('/api/employees');
        if(!response.ok) {
            throw new Error('fetch employees failed')
        }
        return await response.json();
    } catch(err) {
        console.error(err);
    }
}