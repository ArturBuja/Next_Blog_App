import prisma from '@/utils/conenct';
import { NextResponse } from 'next/server';

// Utils
import { getAuthSession } from '@/utils/auth';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const postSlug = searchParams.get('postSlug');
  const commentId = searchParams.get('commentId');

  if (commentId) {
    try {
      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
        include: { user: true },
      });
      return new NextResponse(JSON.stringify(comment), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrong!' }),
        { status: 500 }
      );
    }
  }

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

//create a comments from post
export const POST = async (request: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
    });
  }

  try {
    const body = await request.json();
    const comment = await prisma.comment.create({
      data: { ...body, userEmail: session?.user?.email },
    });
    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
    });
  }
  try {
    const body = await request.json();
    const comment = await prisma.comment.delete({
      where: { id: body.id },
    });
    return new NextResponse(JSON.stringify(comment), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

export const PATCH = async (request: Request) => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
    });
  }
  try {
    const body = await request.json();
    const updatedComment = await prisma.comment.update({
      where: { id: body.id },
      data: {
        desc: body.desc,
        modified: true,
        modifiedAt: new Date(),
      },
    });
    return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
