import { NextResponse } from 'next/server';
//utils
import { POST_PER_PAGE } from '@/utils/contants';
import { getAuthSession } from '@/utils/auth';
import { Prisma } from '@prisma/client';
import prisma from '@/utils/conenct';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const cat = searchParams.get('cat');
  const popular = searchParams.get('popular');
  const liked = searchParams.get('liked');
  if (popular) {
    const posts = await prisma.post.findMany({
      where: {
        views: {
          gt: 0,
        },
      },
      orderBy: [
        {
          views: 'desc',
        },
      ],
      take: 3,
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  }
  if (liked) {
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          gt: 0,
        },
      },
      orderBy: [
        {
          likes: 'desc',
        },
      ],
      take: 3,
    });
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  }

  const query: Prisma.PostFindManyArgs = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: 'desc',
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);

    return new NextResponse(JSON.stringify({ posts, count }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

//create a post
export const POST = async (request: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
    });
  }

  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
