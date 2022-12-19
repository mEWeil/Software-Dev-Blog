import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoutes({ userInfo }) {
  return (
    userInfo ? <Outlet/> : <Navigate to=''/>
  )
}
