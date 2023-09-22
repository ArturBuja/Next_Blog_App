// pages/api/likes.js
import { getAuthSession } from '@/utils/auth';
import prisma from '@/utils/conenct';
import { NextResponse } from 'next/server';

export const POST = async req => {
  const session = await getAuthSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ message: 'Not authorized' }), {
      status: 401,
    });
  }

  const { postId, userId } = req.body;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingLike) {
      // Użytkownik już polubił ten post, więc usuwamy like.
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      // Aktualizacja liczby polubień w poście.
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return new NextResponse(
        JSON.stringify({ message: 'Un-Like successful' }),
        {
          status: 200,
        }
      );
    } else {
      await prisma.like.create({
        data: {
          postId: postId,
          userId: session.user.id,
          liked: true,
        },
      });

      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return new NextResponse(JSON.stringify({ message: 'Like successful' }), {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};
