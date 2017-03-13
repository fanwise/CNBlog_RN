export const summary = (value) => {
    return {
        blogId: value.id.text,
        title: value.title.text,
        avatar: value.author.avatar.text,
        summary: value.summary.text,
        views: value.views.text,
        diggs: value.diggs.text,
        comments: value.comments.text,
        published: value.published.text
    }
};
