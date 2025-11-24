import { PropsWithChildren, useEffect, useMemo, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { CHALLENGES } from "../../../../features/challenges";
import { Logo, SubHeader } from "../../../components";
import { ThreeLinesIcon, XIcon } from "../../../icons";
import { TRoute, useGetRoutes } from "../../../../features/router";
import { NavbarNavigationItem } from "./types";

export function Navbar({ children }: PropsWithChildren) {
  const getRoutes = useGetRoutes();
  const location = useLocation();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const homeHref = useMemo(
    () => getRoutes.getHref({ type: TRoute.HOME }),
    [getRoutes],
  );
  const NAVBAR_NAVIGATION_ITEMS: NavbarNavigationItem[] = useMemo(
    () => [
      {
        id: "home",
        label: "Home",
        href: homeHref,
      },
      ...CHALLENGES.map((challenge) => ({
        id: challenge.id,
        label: challenge.name,
        href: getRoutes.getHref({
          type: TRoute.CHALLENGE_BY_ID,
          id: challenge.id,
        }),
      })),
    ],
    [homeHref, getRoutes],
  );

  useEffect(() => {
    if (location.pathname) {
      setDrawerOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="drawer">
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={(e) => setDrawerOpen(e.target.checked)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-primary text-primary-content w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <ThreeLinesIcon />
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <Link className="btn btn-square btn-ghost w-fit px-2" to={homeHref}>
              <Logo />
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {NAVBAR_NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <div className="flex items-center gap-2">
            <SubHeader className="mb-0">Navigation</SubHeader>
            <button
              onClick={() => setDrawerOpen(false)}
              className="btn btn-ghost btn-square ml-auto"
            >
              <XIcon />
            </button>
          </div>
          {NAVBAR_NAVIGATION_ITEMS.map((item) => (
            <li key={item.id}>
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
