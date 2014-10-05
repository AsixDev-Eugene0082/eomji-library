var fs   = require('fs')
var data = JSON.parse(fs.read('emojis.json'))
var keys = Object.keys(data)

var testForOrphan = keys.length != 884

if(keys.length != 884) {
  console.log("There are 884 emojis, but emojis.json has " + keys.length + " entries.")
}

var dups = []

keys.forEach(function(key) {
  if(dups.indexOf(key) < 0) dups.push(key)
})

var testForDups = dups.length != keys.length

if(testForDups) {
  dups.forEach(function(key) {
    console.log("There is more than one " + key + " in emojis.json.")
  })
}

var unnecessities = []

keys.forEach(function(key) {
  data[key].forEach(function(keyword) {
    if(key.match(keyword)) unnecessities.push([key, keyword])
  })
})

var testForUnnecessities = unnecessities.length > 0

if(testForUnnecessities) {
  unnecessities.forEach(function(arr) {
    console.log("\"" + arr[1] + "\" is unnecessary as it is already part of \"" + arr[0] + "\" and will be matched.")
  })
}

var buildFailed = testForOrphan || testForDups || testForUnnecessities

if(buildFailed) {
  phantom.exit(buildFailed)
} else {
  console.log(":sparkles::+1:")
  phantom.exit()
}
