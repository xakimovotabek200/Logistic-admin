import { setOpenSidenav, useMaterialTailwindController } from "@/context";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import brandImg from "../../assets/Logo.png";

export function Sidenav({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, fixedNavbar } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 overflow-y-auto rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <div className="flex items-center gap-4 py-4 px-8 ">
          <Link
            to="/dashboard/home/"
            className=" items-center justify-center gap-4"
          >
            <Avatar
              className="md:mt:3 mx-auto w-full object-cover"
              src={brandImg}
            />
          </Link>
        </div>
      </div>
      <div className="m-2">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, description }, index) => (
              <li key={index}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                      onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                      {icon}
                      {name ? (
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      ) : null}
                    </Button>
                  )}
                </NavLink>
                {description ? (
                  <Typography className="ml-3 font-medium capitalize text-blue-gray-500">
                    {description}
                  </Typography>
                ) : null}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "Artel Logistics",
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
