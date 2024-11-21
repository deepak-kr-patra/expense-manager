const CategoryBox = () => {
    return (
        <div className="flex flex-col items-start justify-center p-4">
            <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                <div className="color-square bg-[#2D7FF9]"></div>
                <h3 className="square-text">Food</h3>
            </div>
            <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                <div className="color-square bg-[#FF08C2]"></div>
                <h3 className="square-text">Clothing</h3>
            </div>
            <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                <div className="color-square bg-[#20D9D2]"></div>
                <h3 className="square-text">Home</h3>
            </div>
            <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                <div className="color-square bg-[#8B46FF]"></div>
                <h3 className="square-text">Travel</h3>
            </div>
            <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                <div className="color-square bg-[#20C933]"></div>
                <h3 className="square-text">Study</h3>
            </div>
            <div className="flex items-center justify-center p-0.5 md:p-1 gap-1 md:gap-2">
                <div className="color-square bg-[#FF6F2C]"></div>
                <h3 className="square-text">Others</h3>
            </div>
        </div>
    )
}

export default CategoryBox