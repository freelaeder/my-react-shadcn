
const GridBox = () => {
    return (
        <div className={'w-full h-[95vh] grid grid-cols-4 gap-4 p-4   md:grid-cols-3  lg:grid-cols-4'}>
            <div className={'w-full h-full border border-gray-100 rounded'} >01</div>
            <div className={'w-full h-full border border-gray-100 rounded'} >02</div>
            <div className={'w-full h-full border border-gray-100 rounded'} >03</div>
            <div className={'w-full h-full border border-gray-100 rounded'} >04</div>
            <div className={'w-full h-full border border-gray-100 rounded'} >05</div>
        </div>
    );
};

export default GridBox;