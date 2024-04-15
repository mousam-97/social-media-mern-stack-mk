import Post from "../models/Post.js";


// CREATE
export async function createPost(req, res) {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        // get all the posts from db and send to FE
        const post = await Post.find();
        res.status(201).json({ post });

    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// READ
export async function getFeedPosts(req, res) {
    try {
        // find all posts
        const post = await Post.find();
        res.status(200).json({ post });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export async function getUserPost(req, res) {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json({ post });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// UPDATE
export async function likePost(req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });

    }
}