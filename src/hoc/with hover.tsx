import { useState } from "react";

const withHover = (WrappedComponent: any) => {
  return (props: any) => {
    const [hovered, setHovered] = useState(false);

    const tokenFromHOC = localStorage.getItem("token");

    const handleMouseEnter = () => {
      setHovered(true);
    }

    const handleMouseLeave = () => {
      setHovered(false);
    }

    return (
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <WrappedComponent {...props} hovered={hovered} tokenFromHOC={tokenFromHOC} />
      </div>
    )
  }
}

export default withHover;