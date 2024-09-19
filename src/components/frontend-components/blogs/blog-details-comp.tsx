import { useEffect, useState } from 'react';
import moment from "moment";
import { useParams } from 'react-router-dom';

import Navbar from "../../navbar";
import authorImg from '../../../assets/images/user-default-img.png'
import blogImg from '../../../assets/images/blogimg2.png';
import { ApiResponse, BlogPost } from '../../../common';
import { RETREIVE_BLOGS } from '../../../services';
import { AxiosError, AxiosResponse } from 'axios';


const BlogDetailsComp = () => {
    const params = useParams();
    const blogSlug: string | undefined = params['slug'];

    const [loading, setLoading] = useState<boolean>(false);
    const [blog, setBlog] = useState<BlogPost | null>(null);

    const retrieveBlogs = (slug: string) => {
        setLoading(true);
        const query: string = `?slug=${slug}&status=PUBLISHED&populate=author,comments,comment.replies`
        RETREIVE_BLOGS(query).then((res: AxiosResponse<ApiResponse>) => {
            const { success, payload } = res.data;
            if(success){
                setLoading(false);
                setBlog(payload[0]);
            }
        })
        .catch((err: AxiosError<ApiResponse>) => {
            setLoading(false);
            if(err?.response?.data){
                console.log(err.response?.data.message)
            }
        })
    }

    useEffect(() => {
        if(blogSlug){
            retrieveBlogs(blogSlug)
        }
    }, [blogSlug]);

    return (
        <>
           <div className="mx-auto w-full mb-4 sm:w-11/12 md:w-10/2 lg:w-10/12">
                <Navbar template={'dark'} />
           </div>

           <div className="mx-auto w-10/12 mb-4 sm:w-9/12 md:w-7/2 lg:w-6/12">
                <div className="my-4">
                    <span className="text-[#f2f4fb] bg-[#4b6bfb] rounded-[7px] px-2 py-1 text-center capitalize">{ blog?.category.toLowerCase() || 'General'}</span>
                </div>

                {/* title */}
                <div>
                    <p className="text-3xl font-semibold text-black mb-4">{blog?.title}</p>
                    {
                        (blog?.subTitle && blog.subTitle !== '') && (
                            <p className="text-lg mb-4 italic text-black">{blog.title}</p>
                        )
                    }
                </div>

                {/* author details */}
                <div className="flex justify-start gap-4 md:gap-8 lg:gap-8 mt-6 mb-4">
                    <div className="flex justify-start gap-2">
                        {/* author img */}
                        <div>
                            <img src={blog?.author?.profileImage ? blog.author.profileImage : authorImg} className="rounded-full w-[30px] h-[30px]" alt="author Image" />
                        </div>
                        <div>
                            <p className="text-black">{blog?.author?.firstName} {blog?.author?.lastName}</p>
                        </div>
                    </div>

                    <div>
                        {/* Date */}
                        <p className="text-black">
                            { moment(blog?.createdAt).format("Do MMMM YYYY")}
                        </p>
                    </div>
                </div>

                {/* Blog Image */}
                <div className='my-4'>
                    <img src={blogImg} width="100%" alt="blog img" />
                </div>

                {/* Content section */}
                <div className="my-8">
                    <p className="text-black">
                        { blog?.content }
                    </p>
                </div>
           </div>

            
        </>
    )
}

export default BlogDetailsComp;