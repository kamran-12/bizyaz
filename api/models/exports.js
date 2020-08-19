let models = "Comment, Community, Follow, Post, Reaction, User";

models.split(', ').forEach(x => exports[x] = require('./' + x))