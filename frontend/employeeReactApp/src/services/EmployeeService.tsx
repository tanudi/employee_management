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

export async function searchEmployees(searchTerm:string | undefined) {
  try {
    const response = await fetch(`api/employees/search?searchText=${searchTerm}`);
    if(!response.ok) {
        throw new Error('search api failed');
    }
    return await response.json();
  }  catch(err) {
    console.error(err);
  } 
}