import DataTable from 'react-data-table-component';


const DataGrid=(props)=> {
    const columns=[]

    props.header.map((val,index)=>{
        columns.push({
            name:val,
            selector:row=>row[val]

        })})
    console.log(columns)



    
    return (
        <DataTable
            columns={columns}
            data={props.columnData}
            pagination
        />
    );
};

export default DataGrid;