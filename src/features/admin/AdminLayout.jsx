import AppLayout from "../../ui/AppLayout";
import { CustomNavLink } from "../../ui/CustomNavlLink";
import Sidebar from "../../ui/Sidebar";
import {
  HiCollection,
  HiHome,
  HiUser,
  HiOutlineViewGrid,
} from "react-icons/hi";

function AdminLayout() {
  return (
    <AppLayout>
      <Sidebar>
        <CustomNavLink to="dashboard">
          <HiHome />
          <span>Dashboard</span>
        </CustomNavLink>
        <CustomNavLink to="users">
          <HiUser />
          <span>Users</span>
        </CustomNavLink>
        <CustomNavLink to="projects">
          <HiOutlineViewGrid />
          <span>Projects</span>
        </CustomNavLink>
        <CustomNavLink to="proposals">
          <HiCollection />
          <span>Requests</span>
        </CustomNavLink>
      </Sidebar>
    </AppLayout>
  );
}
export default AdminLayout;