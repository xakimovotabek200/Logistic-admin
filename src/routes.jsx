import {
  Bars3Icon,
  BookmarkIcon,
  PhoneIcon,
  HomeIcon,
  UserGroupIcon,
  BriefcaseIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import GetGroups from "./pages/About/About";
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
        icon: <PhoneIcon {...icon} />,
        name: "contact",
        path: "/contact",
        element: <Contact />,
      },
      {
        icon: <BriefcaseIcon {...icon} />,
        name: "vacancy",
        path: "/vacansy",
        element: <GetKategoriya />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "News",
        path: "/news",
        element: <NewsForm />,
      },
    ],
  },
];

export default routes;
