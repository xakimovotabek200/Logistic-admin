import {
  Bars3Icon,
  BookmarkIcon,
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import GetGroups from "./pages/About/About";
import GetUser from "./pages/Blog/Blog";
import NewsForm from "./pages/News/News";
import GetKategoriya from "./pages/Vacansy/GetKategoriya";
import Contact from "./pages/contact/Contact";
import GetOrder from "./pages/home/GetOrder";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <GetOrder />,
      },

      {
        icon: <UserGroupIcon {...icon} />,
        name: "About Us",
        path: "/about-us",
        element: <GetGroups />,
      },
      {
        icon: <BookmarkIcon {...icon} />,
        name: "contact",
        path: "/contact",
        element: <Contact />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Blog us",
        path: "/blog",
        element: <GetUser />,
      },

      {
        icon: <Bars3Icon {...icon} />,
        name: "vacansy",
        path: "/vacansy",
        element: <GetKategoriya />,
      },
      {
        icon: <Bars3Icon {...icon} />,
        name: "News",
        path: "/news",
        element: <NewsForm />,
      },
    ],
  },
];

export default routes;
