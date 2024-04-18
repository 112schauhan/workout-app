export function compareArrays(arr1: any, arr2: any) {
    // Filter over each element in the second array by comparing with first
    const result = arr2.filter((item:any)=> arr1.includes(item?.title));
    return result;
}