import React, { useEffect, useMemo, useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router";
import { router } from "@/route";

const MenuContainer: React.FC = () => {
  const [current, setCurrent] = useState("");
  const navigation = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigation(e.key);
  };
  // 获取路由
  const routerItems = useMemo(
    () =>
      router.routes[0].children?.map(
        (it) =>
          ({
            label: it.path === "" ? "home" : it.path,
            key: it.path,
          } as {
            label: string;
            key: string;
          })
      ),
    [router]
  );

  // 监听路由变化
  useEffect(() => {
    setCurrent(router.state.location.pathname.replace("/", ""));
  }, [router.state.location.pathname]);

  // 渲染菜单
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      style={{ flex: "auto", minWidth: 0 }}
      mode="horizontal"
      items={routerItems}
    />
  );
};

export default MenuContainer;
