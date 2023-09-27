import { NextResponse } from 'next/server';
//utils
import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/conenct';

export const POST = async (req: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
    });
  }

  const body = await req.json();
  const { postSlug, userEmail } = body;

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postSlug,
        userEmail,
        liked: true,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      const post = await prisma.post.update({
        where: {
          slug: postSlug,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return new NextResponse(JSON.stringify(post), {
        status: 200,
      });
    } else {
      await prisma.like.create({
        data: {
          postSlug,
          userEmail,
          liked: true,
        },
      });

      const post = await prisma.post.update({
        where: {
          slug: postSlug,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return new NextResponse(JSON.stringify(post), {
        status: 200,
      });
    }
  } catch (error) {
    console.warn(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const postSlug = searchParams.get('postSlug');
  const userEmail = searchParams.get('userEmail');

  try {
    const [like, likesList] = await Promise.all([
      prisma.like.findFirst({
        where: {
          ...(postSlug && { postSlug }),
          ...(userEmail && { userEmail }),
          liked: true,
        },
      }),
      prisma.like.findMany({
        where: {
          ...(postSlug && { postSlug }),
          liked: true,
        },
      }),
    ]);

    return new NextResponse(
      JSON.stringify({ isLiked: like !== null, likes: likesList }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
