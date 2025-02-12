var lengthOfLongestSubstring = function (s) {
  console.log(s)
  if (s.length <= 1) return s.length
  const chars = {}
  for (let i = 0; i < s.length; i++) {
    console.log(`i: ${i}; c: ${s[i]}`)
    if (chars[s[i]] !== undefined) return Math.max(i, lengthOfLongestSubstring(s.substring(chars[s[i]] + 1, s.length)))
    chars[s[i]] = i
  }
  return s.length
};

console.log(lengthOfLongestSubstring("abcabcbb"))
