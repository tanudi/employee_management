import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Employee from "./components/Employee"
import { fetchEmployees } from "./services/EmployeeService"
import Error from "./components/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Employee />,
    loader: fetchEmployees,
    errorElement: <Error />
  }
])


function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
