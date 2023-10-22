export type myCache = {
    [key: string]: number
};

export function sumWithCache(cache: myCache, a: number, b: number){
    const newKey: string = `${a}_${b}`;

    if (cache[newKey] === undefined){
        console.log("Adding to cache!");
        cache[newKey] = a + b;
    }
    return cache[newKey];
}