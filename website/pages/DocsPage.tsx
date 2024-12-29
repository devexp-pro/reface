import { component } from "@reface";
import { Box, Panel, RefaceUI, Splitter, Stack, TreeView } from "@reface-ui";
import { styled } from "@reface";
import {
  BrandName,
  BrandTagline,
  Logo,
  LogoText,
} from "../components/Logo.tsx";
import { Navigation } from "../components/Navigation.tsx";
import { MarkdownContent, TableOfContents } from "../modules/markdown/mod.tsx";
import type { DocPage, DocSection } from "../utils/docs.tsx";

interface DocsViewerProps {
  sections: DocSection[];
  pages: Map<string, DocPage>;
  currentPath?: string;
}

const LogoLink = styled.a`
  & {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }
`;

const PageTransition = styled.div`
  & {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default component((props: DocsViewerProps) => {
  const currentPage = props.currentPath
    ? props.pages.get(props.currentPath)
    : props.pages.get("readme");

  return (
    <RefaceUI>
      <Stack direction="vertical" gap="0">
        <Box padding="md">
          <LogoLink href="/">
            <Logo />
            <LogoText>
              <BrandName>Reface</BrandName>
              <BrandTagline>Documentation</BrandTagline>
            </LogoText>
          </LogoLink>
        </Box>

        <Splitter>
          <Panel>
            <Navigation
              sections={props.sections}
              currentPath={props.currentPath}
            />
          </Panel>

          <Stack direction="horizontal" gap="lg">
            <Box flex="1">
              <PageTransition>
                {currentPage
                  ? (
                    <MarkdownContent>
                      {currentPage.content.content}
                    </MarkdownContent>
                  )
                  : <p>Page not found</p>}
              </PageTransition>
            </Box>

            {currentPage && currentPage.content.headings.length > 0 && (
              <Box width="240px">
                <TableOfContents
                  headings={currentPage.content.headings}
                  className="desktop"
                />
              </Box>
            )}
          </Stack>
        </Splitter>
      </Stack>
    </RefaceUI>
  );
});
