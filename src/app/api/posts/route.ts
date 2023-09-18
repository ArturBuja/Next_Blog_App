import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/conenct';
import { POST_PER_PAGE } from '@/utils/contants';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const cat = searchParams.get('cat');
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

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
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
