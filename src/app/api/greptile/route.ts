import axios from 'axios';
import { NextResponse } from 'next/server';

// Define types for the request body structure
interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
}

interface Repository {
  repository: string;
  branch: string;
}

interface GreptileRequest {
  messages: Message[];
  repositories: Repository[];
  sessionId?: string;
}

export async function POST(request: Request) {
  try {
    const body: GreptileRequest = await request.json();

    // Basic validation
    if (!body.messages?.length || !body.repositories?.length) {
      return NextResponse.json(
        { error: 'Invalid request body: messages and repositories are required' },
        { status: 400 }
      );
    }

    const response = await axios.post('https://api.greptile.com/v2/query', body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GREPTILE_API_KEY}`,
        'X-GitHub-Token': process.env.GITHUB_TOKEN
      }
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.response?.data || 'API request failed' },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 