import { HiCollection, HiHome } from "react-icons/hi";
import AppLayout from "../../ui/AppLayout";

import Sidebar from "../../ui/Sidebar";
import { CustomNavLink } from "../../ui/CustomNavlLink";

function OwnerLayout() {
  return (
    <AppLayout>
      <Sidebar>
        <CustomNavLink to="dashboard">
          <HiHome />
          <span>Dashboard</span>
        </CustomNavLink>
        <CustomNavLink to="projects">
          <HiCollection />
          <span>Projects</span>
        </CustomNavLink>
      </Sidebar>
    </AppLayout>
  );
}

export default OwnerLayout;
