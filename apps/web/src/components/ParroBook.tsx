"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

/* -------------------------------------------------------------------------- */
/*                                  SETTINGS                                  */
/* -------------------------------------------------------------------------- */

const BOOK_WIDTH = 1.65;
const BOOK_HEIGHT = 2.35;

const COVER_THICKNESS = 0.055;
const SPINE_WIDTH = 0.09;

const PAGE_WIDTH = BOOK_WIDTH - 0.06;
const PAGE_HEIGHT = BOOK_HEIGHT - 0.1;
const PAGE_THICKNESS = 0.008;
const PAGE_STACK_STEP = 0.012;

/* -------------------------------------------------------------------------- */
/*                                PAGE CONTENT                                */
/* -------------------------------------------------------------------------- */

type PageData = {
  frontKicker: string;
  frontTitle: string;
  frontBody: string;
  backKicker: string;
  backTitle: string;
  backBody: string;
};

const PAGE_CONTENT: PageData[] = [
  {
    frontKicker: "WELCOME TO PARRO",
    frontTitle: "Everything starts with a good note.",
    frontBody:
      "Find study material in one organised place. Spend less time searching and more time learning.",
    backKicker: "A CLEARER WAY TO LEARN",
    backTitle: "Your learning, organised.",
    backBody:
      "Browse through programs, academic periods, subjects, topics and notes in a structured library.",
  },
  {
    frontKicker: "EXPLORE",
    frontTitle: "Find what you need.",
    frontBody:
      "Move from your program to a subject, then open the topic you are studying.",
    backKicker: "MADE FOR STUDENTS",
    backTitle: "One place. Less searching.",
    backBody:
      "Keep your study sessions focused with learning material organised around your course.",
  },
  {
    frontKicker: "LEARN YOUR WAY",
    frontTitle: "Study at your own pace.",
    frontBody:
      "Read notes and use available learning resources whenever you need to revise a topic.",
    backKicker: "YOUR STUDY SPACE",
    backTitle: "Build your understanding.",
    backBody:
      "Return to topics, review the important points and keep moving through your learning journey.",
  },
  {
    frontKicker: "MISSING SOMETHING?",
    frontTitle: "Ask for the notes you need.",
    frontBody:
      "Tell Parro Notes which subject or topic you cannot find so the team can review your request.",
    backKicker: "KEEP MOVING FORWARD",
    backTitle: "Your next chapter starts here.",
    backBody:
      "Open the notes library and explore the resources available for your studies.",
  },
];

/* -------------------------------------------------------------------------- */
/*                              PAGE TYPOGRAPHY                               */
/* -------------------------------------------------------------------------- */

type PageTypographyProps = {
  kicker: string;
  title: string;
  body: string;
  pageNumber: number;
  hint: string;
  visible: boolean;
};

function PageTypography({
  kicker,
  title,
  body,
  pageNumber,
  hint,
  visible,
}: PageTypographyProps) {
  const marginX = 0.16;
  const contentWidth = PAGE_WIDTH - marginX * 2;
  const leftEdge = -PAGE_WIDTH / 2 + marginX;
  const rightEdge = PAGE_WIDTH / 2 - marginX;

  return (
    <group visible={visible}>
      <Text
        position={[leftEdge, 0.78, 0]}
        fontSize={0.058}
        fontWeight={700}
        color="#2563eb"
        maxWidth={contentWidth}
        anchorX="left"
        anchorY="top"
        letterSpacing={0.08}
      >
        {kicker}
      </Text>

      <Text
        position={[leftEdge, 0.58, 0]}
        fontSize={0.145}
        fontWeight={800}
        color="#0f172a"
        maxWidth={contentWidth}
        lineHeight={1.18}
        anchorX="left"
        anchorY="top"
        overflowWrap="break-word"
      >
        {title}
      </Text>

      <Text
        position={[leftEdge, 0.05, 0]}
        fontSize={0.082}
        color="#475569"
        maxWidth={contentWidth}
        lineHeight={1.45}
        anchorX="left"
        anchorY="top"
        overflowWrap="break-word"
      >
        {body}
      </Text>

      <mesh position={[0, -0.74, 0]}>
        <planeGeometry args={[contentWidth, 0.005]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>

      <Text
        position={[leftEdge, -0.88, 0]}
        fontSize={0.052}
        fontWeight={700}
        color="#94a3b8"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {`PARRO NOTES  •  0${pageNumber}`}
      </Text>

      <Text
        position={[rightEdge, -0.88, 0]}
        fontSize={0.052}
        fontWeight={600}
        color="#3b82f6"
        anchorX="right"
        anchorY="middle"
      >
        {hint}
      </Text>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                              INDIVIDUAL PAGE                               */
/* -------------------------------------------------------------------------- */

type PageSheetProps = {
  index: number;
  data: PageData;
  opened: boolean;
  pageIndex: number;
  onNext: () => void;
  onPrevious: () => void;
};

function PageSheet({
  index,
  data,
  opened,
  pageIndex,
  onNext,
  onPrevious,
}: PageSheetProps) {
  const pageRef = useRef<THREE.Group | null>(null);
  const [hovered, setHovered] = useState(false);

  const turned = index < pageIndex;
  const isInteractive =
    opened &&
    ((!turned && index === pageIndex) || (turned && index === pageIndex - 1));

  useCursor(hovered && isInteractive);

  const showFrontText =
    opened && (index === pageIndex || index === pageIndex - 1);
  const showBackText =
    opened && (index === pageIndex - 1 || index === pageIndex - 2);

  useFrame((_, delta) => {
    const page = pageRef.current;
    if (!page) return;

    const targetAngle = !opened
      ? 0
      : turned
        ? -Math.PI + 0.035
        : -0.02;

    page.rotation.y = THREE.MathUtils.damp(
      page.rotation.y,
      targetAngle,
      7.5,
      delta
    );

    const targetZ = turned
      ? (index + 1) * PAGE_STACK_STEP
      : -index * PAGE_STACK_STEP;

    page.position.z = THREE.MathUtils.damp(
      page.position.z,
      targetZ,
      7.5,
      delta
    );
  });

  const handlePageClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    if (!opened) return;

    if (!turned && index === pageIndex) {
      onNext();
    } else if (turned && index === pageIndex - 1) {
      onPrevious();
    }
  };

  return (
    <group
      ref={pageRef}
      position={[0, 0, -index * PAGE_STACK_STEP]}
      onClick={handlePageClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh
        position={[PAGE_WIDTH / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[PAGE_WIDTH, PAGE_HEIGHT, PAGE_THICKNESS]} />
        <meshStandardMaterial
          color={hovered && isInteractive ? "#ffffff" : "#fcfaf5"}
          roughness={0.92}
          metalness={0}
          polygonOffset
          polygonOffsetFactor={1}
        />
      </mesh>

      <mesh position={[0.03, 0, PAGE_THICKNESS / 2 + 0.0005]}>
        <planeGeometry args={[0.06, PAGE_HEIGHT]} />
        <meshBasicMaterial color="#e2e8f0" transparent opacity={0.45} />
      </mesh>

      <group position={[PAGE_WIDTH / 2, 0, PAGE_THICKNESS / 2 + 0.002]}>
        <PageTypography
          kicker={data.frontKicker}
          title={data.frontTitle}
          body={data.frontBody}
          pageNumber={index * 2 + 1}
          hint="Next →"
          visible={showFrontText}
        />
      </group>

      <group
        position={[PAGE_WIDTH / 2, 0, -PAGE_THICKNESS / 2 - 0.002]}
        rotation={[0, Math.PI, 0]}
      >
        <PageTypography
          kicker={data.backKicker}
          title={data.backTitle}
          body={data.backBody}
          pageNumber={index * 2 + 2}
          hint="← Prev"
          visible={showBackText}
        />
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                             PARRO LOGO TEXTURE                             */
/* -------------------------------------------------------------------------- */

function ParroLogo() {
  const texture = useTexture("/parro-logo.png");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={[0, 0.36, 0]}>
      <planeGeometry args={[0.72, 0.72]} />
      <meshBasicMaterial
        map={texture}
        transparent
        toneMapped={false}
      />
    </mesh>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 BOOK COVER                                 */
/* -------------------------------------------------------------------------- */

type BookCoverProps = {
  opened: boolean;
  pageIndex: number;
  onOpen: () => void;
  onClose: () => void;
};

function BookCover({ opened, pageIndex, onOpen, onClose }: BookCoverProps) {
  const coverRef = useRef<THREE.Group | null>(null);
  const [hovered, setHovered] = useState(false);

  const canInteract = !opened || (opened && pageIndex === 0);
  useCursor(hovered && canInteract);

  useFrame((_, delta) => {
    if (!coverRef.current) return;

    const targetAngle = opened ? -Math.PI + 0.03 : 0;
    coverRef.current.rotation.y = THREE.MathUtils.damp(
      coverRef.current.rotation.y,
      targetAngle,
      6.5,
      delta
    );
  });

  const handleCoverClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    if (!opened) {
      onOpen();
    } else if (pageIndex === 0) {
      onClose();
    }
  };

  return (
    <group
      ref={coverRef}
      position={[0, 0, 0.015]}
      onClick={handleCoverClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox
        position={[BOOK_WIDTH / 2, 0, COVER_THICKNESS / 2]}
        args={[BOOK_WIDTH, BOOK_HEIGHT, COVER_THICKNESS]}
        radius={0.03}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color="#2563eb"
          roughness={0.42}
          metalness={0.05}
        />
      </RoundedBox>

      <group position={[BOOK_WIDTH / 2, 0, COVER_THICKNESS + 0.003]}>
        <Suspense fallback={null}>
          <ParroLogo />
        </Suspense>

        <Text
          position={[0, -0.28, 0]}
          fontSize={0.18}
          fontWeight={800}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          PARRO
        </Text>

        <Text
          position={[0, -0.48, 0]}
          fontSize={0.078}
          fontWeight={700}
          color="#dbeafe"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.24}
        >
          NOTES
        </Text>

        <Text
          position={[0, -0.88, 0]}
          fontSize={0.055}
          fontWeight={600}
          color="#bfdbfe"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
        >
          CLICK TO OPEN →
        </Text>
      </group>

      <group
        position={[BOOK_WIDTH / 2, 0, -0.002]}
        rotation={[0, Math.PI, 0]}
        visible={opened && pageIndex === 0}
      >
        <mesh>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.94}
            polygonOffset
            polygonOffsetFactor={1}
          />
        </mesh>

        <group position={[0, 0, 0.003]}>
          <Text
            position={[0, 0.28, 0]}
            fontSize={0.11}
            fontWeight={800}
            color="#1e3a8a"
            anchorX="center"
            anchorY="middle"
            textAlign="center"
            maxWidth={PAGE_WIDTH - 0.3}
            letterSpacing={0.05}
          >
            YOUR NEXT CHAPTER
          </Text>

          <mesh position={[0, 0.05, 0]}>
            <planeGeometry args={[0.6, 0.006]} />
            <meshBasicMaterial color="#93c5fd" />
          </mesh>

          <Text
            position={[0, -0.18, 0]}
            fontSize={0.08}
            color="#64748b"
            anchorX="center"
            anchorY="middle"
            textAlign="center"
            maxWidth={PAGE_WIDTH - 0.3}
            lineHeight={1.35}
          >
            {"Learn something new.\nOne page at a time."}
          </Text>

          <Text
            position={[0, -0.88, 0]}
            fontSize={0.052}
            fontWeight={700}
            color="#3b82f6"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            ✕ CLICK TO CLOSE BOOK
          </Text>
        </group>
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 BACK COVER                                 */
/* -------------------------------------------------------------------------- */

type BackCoverProps = {
  opened: boolean;
  pageIndex: number;
  onClose: () => void;
};

function BackCover({ opened, pageIndex, onClose }: BackCoverProps) {
  const [hovered, setHovered] = useState(false);
  const backZ = -(PAGE_CONTENT.length * PAGE_STACK_STEP) - 0.025;
  const isEndVisible = opened && pageIndex === PAGE_CONTENT.length;

  useCursor(hovered && isEndVisible);

  return (
    <group
      position={[0, 0, backZ]}
      onClick={(e) => {
        if (isEndVisible) {
          e.stopPropagation();
          onClose();
        }
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <RoundedBox
        position={[BOOK_WIDTH / 2, 0, -COVER_THICKNESS / 2]}
        args={[BOOK_WIDTH, BOOK_HEIGHT, COVER_THICKNESS]}
        radius={0.03}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#1d4ed8" roughness={0.55} />
      </RoundedBox>

      <group position={[PAGE_WIDTH / 2, 0, 0.002]}>
        <mesh>
          <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
          <meshStandardMaterial
            color="#f8fafc"
            roughness={0.94}
            polygonOffset
            polygonOffsetFactor={1}
          />
        </mesh>

        {isEndVisible && (
          <group position={[0, 0, 0.003]}>
            <Text
              position={[0, 0.22, 0]}
              fontSize={0.12}
              fontWeight={800}
              color="#1e3a8a"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
            >
              READY TO START?
            </Text>

            <Text
              position={[0, -0.06, 0]}
              fontSize={0.08}
              color="#64748b"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              maxWidth={PAGE_WIDTH - 0.35}
              lineHeight={1.4}
            >
              {"You have reached the end of the preview.\nClick here to close the book."}
            </Text>

            <Text
              position={[0, -0.45, 0]}
              fontSize={0.07}
              fontWeight={700}
              color="#2563eb"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.06}
            >
              ↺ CLOSE BOOK
            </Text>
          </group>
        )}
      </group>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  3D SCENE                                  */
/* -------------------------------------------------------------------------- */

type BookSceneProps = {
  opened: boolean;
  pageIndex: number;
  onOpenBook: () => void;
  onCloseBook: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

function BookScene({
  opened,
  pageIndex,
  onOpenBook,
  onCloseBook,
  onNext,
  onPrevious,
}: BookSceneProps) {
  const rootRef = useRef<THREE.Group | null>(null);

  const camera = useThree((state) => state.camera);
  const viewportWidth = useThree((state) => state.viewport.width);

  // LOWERED THE MINIMUM SCALE CAP:
  // Dropped the Math.max boundary from 0.75 down to 0.35. 
  // This allows the open book to shrink aggressively and fit cleanly on thin mobile screens.
  const sceneScale = Math.min(
    1.0, 
    Math.max(0.35, viewportWidth / (BOOK_WIDTH * 2.3))
  );

  useFrame((state, delta) => {
    const targetX = opened ? 0 : (BOOK_WIDTH * sceneScale) / 2;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      targetX,
      5,
      delta
    );
    camera.lookAt(targetX, 0, 0);

    if (rootRef.current) {
      rootRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.9) * 0.03;

      const targetRotX = opened ? -0.14 : -0.1;
      const targetRotY = opened
        ? Math.sin(state.clock.elapsedTime * 0.5) * 0.02
        : -0.22 + Math.sin(state.clock.elapsedTime * 0.5) * 0.025;

      rootRef.current.rotation.x = THREE.MathUtils.damp(
        rootRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    }
  });

  const spineDepth = PAGE_CONTENT.length * PAGE_STACK_STEP + COVER_THICKNESS * 2;

  return (
    <>
      <ambientLight intensity={1.25} />
      <directionalLight
        position={[3, 6, 6]}
        intensity={1.8}
        castShadow
      />
      <directionalLight position={[-4, 3, 4]} intensity={0.7} />

      <group ref={rootRef} scale={sceneScale}>
        <BackCover
          opened={opened}
          pageIndex={pageIndex}
          onClose={onCloseBook}
        />

        {PAGE_CONTENT.map((data, index) => (
          <PageSheet
            key={index}
            index={index}
            data={data}
            opened={opened}
            pageIndex={pageIndex}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        ))}

        <RoundedBox
          position={[
            -SPINE_WIDTH / 2 + 0.01,
            0,
            -spineDepth / 2 + COVER_THICKNESS + 0.015,
          ]}
          args={[SPINE_WIDTH, BOOK_HEIGHT, spineDepth]}
          radius={0.025}
          smoothness={3}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#1e40af" roughness={0.48} />
        </RoundedBox>

        <BookCover
          opened={opened}
          pageIndex={pageIndex}
          onOpen={onOpenBook}
          onClose={onCloseBook}
        />
      </group>

      <ContactShadows
        position={[0, -BOOK_HEIGHT / 2 - 0.18, 0]}
        opacity={0.22}
        scale={4.8}
        blur={2.6}
        far={3.5}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                           MAIN EXPORTED COMPONENT                          */
/* -------------------------------------------------------------------------- */

export default function ParroBook() {
  const [opened, setOpened] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const openBook = () => {
    setOpened(true);
  };

  const closeBook = () => {
    setPageIndex(0);
    setOpened(false);
  };

  const nextPage = () => {
    setPageIndex((current) => Math.min(current + 1, PAGE_CONTENT.length));
  };

  const previousPage = () => {
    setPageIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <div className="relative mx-auto w-full select-none">
      {/* Shortened the default height for mobile (280px) so the book doesn't have massive whitespace above/below it */}
      <div className="h-[280px] w-full sm:h-[480px] lg:h-[540px]">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{
            position: [BOOK_WIDTH / 2, 0.25, 5.5], 
            fov: 34,
            near: 0.1,
            far: 100,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
        >
          <Suspense fallback={null}>
            <BookScene
              opened={opened}
              pageIndex={pageIndex}
              onOpenBook={openBook}
              onCloseBook={closeBook}
              onNext={nextPage}
              onPrevious={previousPage}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}