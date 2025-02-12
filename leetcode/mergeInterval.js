function overlap (s, e, s1, e1) {
    return Math.min(e, e1) >= Math.max(s, s1)
}
var merge = function(intervals) {
    return intervals.sort((a, b) => a[0] - b[0]).reduce((r, [start, end]) => {
        const s = r.filter(([sStart, sEnd]) => overlap(start, end, sStart, sEnd))
        const s1 = r.filter(([sStart, sEnd]) => !overlap(start, end, sStart, sEnd))
        if (s.length) {
            const n = s1.push([Math.min(start, ...s.map(e => e[0])), Math.max(end, ...s.map(e => e[1]))])
            return s1
        } else r.push([start, end])
        return r
    }, [])
};

// function merge (a) {
//     const r = new Array(10000)
//     a.forEach((r, [start, end]) => {
//         for (let i=start, i<=end, i++)
//             r[i] = end
//     })
//     const x = []
//     for (let i=0, start=0, last=0; i <= 10000; i++) {
//         if (last === null) {
//             if (r[i]) {
//                 start = r[i]
//             }
//         } else {

//         }
//         last = r[i]
//     }
// }
console.log(merge([[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]))
