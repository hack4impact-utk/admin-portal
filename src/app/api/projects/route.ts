import { createProject, getProjects } from '@/server/actions/Project';
import dbConnect from '@/util/db-connect';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await dbConnect();

  const projects = await getProjects();

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();

  // add validation

  const project = await createProject(body);

  return NextResponse.json(project);
}
