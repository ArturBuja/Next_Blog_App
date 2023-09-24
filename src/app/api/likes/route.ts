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

  const body = await req.json();
  const { postSlug, userEmail } = body;
  console.log('postSlug', postSlug, userEmail);

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postSlug: postSlug,
        userEmail: userEmail,
        liked: true,
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
          id: postSlug,
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
          postSlug: postSlug,
          userEmail: userEmail,
          liked: true,
        },
      });

      await prisma.post.update({
        where: {
          id: postSlug,
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
