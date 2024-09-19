import { FC } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import blogImg from '../../../assets/images/blogimg1.png';
import authorImg from '../../../assets/images/Avatar 1profile.png';
import { BlogPost } from '../../../common';

type Props = {
    blog: BlogPost;
}

const BlogCard: FC<Props> = ({ blog }) => {
    const navigate = useNavigate()
    const handleViewDetails = () => {
        if(!blog) return;
        navigate(`/blogs/view/${blog.slug}`)
    }
    return (
        <>
            <div onClick={handleViewDetails} className="p-3 border-[1px] border-[#e3e3e3] rounded-[5px] hover:scale-105 ease-in delay-500 hover:shadow-md transiton-all hover:border-[#c6d0fb] hover:shadow-[#c6d0fb]">
                <div>
                    <img src={blogImg} width="100%" alt="blog img" />
                </div>

                {/* category */}
                <div className="my-4">
                    <span className="text-[#4b6bfb] bg-[#f2f4fb] rounded-[7px] px-2 py-1 text-center capitalize">{ blog.category.toLowerCase() || 'General'}</span>
                </div>

                {/* title */}
                <div>
                    <p className="text-xl font-semibold">{blog.title}</p>
                </div>

                {/* author details */}
                <div className="flex justify-between gap-4 mt-6 mb-4">
                    <div className="flex justify-start gap-2">
                        {/* author img */}
                        <div>
                            <img src={blog?.author?.profileImage ? blog.author.profileImage : authorImg} className="rounded-full w-[30px] h-[30px]" alt="author Image" />
                        </div>
                        <div>
                            <p>{blog?.author?.firstName} {blog?.author?.lastName}</p>
                        </div>
                    </div>

                    <div>
                        {/* Date */}
                        <p>
                            { moment(blog.createdAt).format("Do MMMM YYYY")}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogCard;