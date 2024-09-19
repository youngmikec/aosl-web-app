import { useState, useEffect } from 'react';

import HeroSection from "../../../shared/users-frontend/hero-section";
import BlogCard from "./BlogCard";
import { ApiResponse, BlogPost } from '../../../common';
import { RETREIVE_BLOGS } from '../../../services';
import { AxiosError, AxiosResponse } from 'axios';


const BlogsComp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    const retrieveBlogs = () => {
        setLoading(true);
        const query: string = `?sort=-createdAt&status=PUBLISHED&populate=author,comments,comment.replies`
        RETREIVE_BLOGS(query).then((res: AxiosResponse<ApiResponse>) => {
            const { success, payload } = res.data;
            if(success){
                setLoading(false);
                setBlogs(payload);
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
        retrieveBlogs()
    }, []);

    return (
        <>
            <HeroSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 overflow-hidden md:ml-32 lg:ml-36 animate__animated animate__fadeInRight">
                    <div className='py-8 w-full relative'>
                        <h3 className='text-5xl font-bold my-8 text-white'>Blogs</h3>
                        <p className='text-sm font-semibold text-justify w-3/4 my-8 text-white'>
                            Explore insights and expert advice in our Blog section. 
                            From transportation and accommodation tips to training, consultancy, personal assistance, and 
                            importing/exporting guidance, our articles cover a range of topics. 
                            Whether you need practical solutions or industry trends, our Blogs provide valuable knowledge to enhance your experience across these services.
                        </p>
                    </div>
                </div>
            </HeroSection>

            <div className="w-full">
                <div className="mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-8/12">
                    <div className="my-4">
                        <p className="text-xl md:text-2xl lg:text-2xl font-semibold">Latest Posts</p>
                    </div>

                    {
                        blogs.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-4">
                                {/** Blogs posts */}
                                {
                                    blogs.map((item: BlogPost, idx: number) => {
                                        return (
                                            <div key={`blog-${item.slug}-${idx}`}>
                                                <BlogCard blog={item} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default BlogsComp;