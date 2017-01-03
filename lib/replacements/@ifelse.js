module.exports = {
  pattern: /@if\s([()\w\s$=><!-]+)([^]+?)@else/gi,
  replacement: function(match, condition, ifBody) {
    let newCondition = condition.replace('==', '=').trim()
    let newIf = `& when (${newCondition}) `
    let newElse = `\n& when not (${newCondition})`
    return newIf + ifBody.trim() + newElse
  },
  order: 0
}
