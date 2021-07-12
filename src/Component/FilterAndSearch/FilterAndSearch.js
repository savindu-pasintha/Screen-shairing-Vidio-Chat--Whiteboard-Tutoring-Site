export default class FilterAndSearch{

    filterList = (dataArray, searchingValue) => {
        var arra = dataArray.filter(name => name.toLowerCase().search(searchingValue.toLowerCase()) !== -1);
        return arra.sort();
    };
}