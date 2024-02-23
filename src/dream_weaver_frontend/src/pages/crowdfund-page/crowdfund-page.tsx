import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import ProxyLink from "../../components/proxy-link";
import { TPost } from "../../types/post-type";
import CrowdfundCard from "./crowdfund-card";
//@ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";

export default function CrowdfundPage() {
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const getPostsResponse = await dream_weaver_backend.getPosts();
      setPosts(getPostsResponse.Ok);
    };

    getPosts();
  }, []);

  return (
    <div className="flex flex-col w-full gap-3">
      <ProxyLink to="/create-crowdfund">
        <Button className="w-full">Create Crowdfund</Button>
      </ProxyLink>
      <div className="flex flex-col gap-8">
        {posts.length > 0 &&
          posts.map((post) => {
            return <CrowdfundCard post={post} key={post.id} />;
          })}
      </div>
    </div>
  );
}
