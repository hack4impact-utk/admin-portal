import useTermQuery from '@/hooks/use-term-query';
import { MemberResponse } from '@/types/dto/member';
import { getMembersProjectForTerm } from '@/util/project';
import {
  HeadCell,
  comparator,
  sortTable,
  sortTableFactory,
} from '@/util/table';
import { getCurrentTerm } from '@/util/term';
import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useClientPagination } from '@hack4impact-utk/use-pagination';
import { tables } from '@/util/constants';

interface MemberTableProps {
  members: MemberResponse[];
}

interface MemberRow {
  firstName: string;
  email: string;
  orgRole: string;
  project: string;
}

const headCells: HeadCell<MemberRow>[] = [
  {
    id: 'firstName',
    label: 'Name',
    numeric: false,
    sortFn(a, b) {
      return comparator(a.firstName.toLowerCase(), b.firstName.toLowerCase());
    },
  },
  {
    id: 'email',
    label: 'Email',
    numeric: false,
    sortFn(a, b) {
      return comparator(a.email.toLowerCase(), b.email.toLowerCase());
    },
  },
  {
    id: 'orgRole',
    label: 'Organization Role',
    numeric: false,
    sortFn(a, b) {
      return comparator(a.orgRole.toLowerCase(), b.orgRole.toLowerCase());
    },
  },
  {
    id: 'project',
    label: 'Project',
    numeric: false,
  },
];

export default function MemberTable({ members }: MemberTableProps) {
  const { term } = useTermQuery(getCurrentTerm());
  // const pagination = useClientPagination(
  //   members,
  //   tables.members.defaultLimit,
  //   tables.members.defaultSort,
  //   tables.members.defaultOrder
  //   sortTableFactory(headCells),
  // );

  return (
    <Paper>
      {/* <TablePagination rowsPerPageOptions={[10, 25, 50]} component="div" /> */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Organization Role</TableCell>
              <TableCell>Project</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => {
              const project = getMembersProjectForTerm(member, term);
              return (
                <TableRow key={member._id}>
                  <TableCell>
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    {member.activeTerms.find((t) => t.term == term)?.orgRole}
                  </TableCell>
                  <TableCell>
                    {project?.name || '-'}
                    {project && (
                      <Chip
                        label={project.role}
                        size="small"
                        sx={{ borderRadius: 1, mx: 1 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
