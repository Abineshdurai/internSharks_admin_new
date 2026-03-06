export default function HStack({
    children,
    justify = "space-between",
    align = 12,
    gap = 12,
    wrap = false,
    className = "",
    style = {}
})  {
    return(
        <div className={className}
        style={{
            display: "flex",
            alignItems: align,
            justifyContent: justify,
            gap,
            flexWrap: wrap ? "wrap" : "nowrap",
            ...style
        }}
        >
            {children}
            
        </div>
    );
}