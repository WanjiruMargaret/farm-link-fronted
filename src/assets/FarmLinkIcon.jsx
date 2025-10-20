const FarmLinkIcon = ({ size = 24, color = "#22c55e" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L10 8H8L10 14H12L14 8H16L14 2H12Z" 
      fill={color}
    />
    <path 
      d="M8 8L6 14H4L6 20H8L10 14H8V8Z" 
      fill={color}
    />
    <path 
      d="M16 8V14H14L16 20H18L16 14H18L16 8Z" 
      fill={color}
    />
    <path 
      d="M12 14L10 20H8L10 22H14L12 20V14Z" 
      fill={color}
    />
  </svg>
);

export default FarmLinkIcon;