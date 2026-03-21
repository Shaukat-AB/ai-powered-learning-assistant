import Navbar from './Navbar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '../ui/sidebar';

const AppSidebar = () => {
  return (
    <Sidebar>
      <div className="flex items-center p-(--header-p) border-b text-accent-foreground h-(--header-h) font-semibold cursor-default">
        <h3 className="text-lg">AI Learning Assistant</h3>
      </div>

      <SidebarContent className="p-(--header-p)">
        <Navbar />
      </SidebarContent>

      <SidebarFooter className="py-(--header-p)">
        <SidebarTrigger className="md:hidden ml-auto" />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
